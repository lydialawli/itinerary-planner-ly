import React, { useState, SyntheticEvent, forwardRef, useMemo, MouseEvent } from 'react'
import {
  Box,
  Typography,
  Slide as Transition,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
} from '@mui/material'
import SuggestionShop from './SuggestionsShop'
import { DialogActions } from '@material-ui/core'

export type ConfirmationProps = Omit<
  InterceptChildrenProps,
  'setCurrentEvent' | 'setCurrentFunction' | 'setShowDialog'
> &
  ConfirmationDialogProps

function LevelPresentation({
  error,
  userInput,
  equation,
  setUserInput,
}: {
  userInput: string
  error: boolean
  equation: string
  setUserInput: (value: string) => void
}) {
  return (
    <>
      <DialogContent>
        <Typography variant="body1">Solve the following problem: ${equation}</Typography>
        <Box paddingTop={2}>
          <TextField
            error={error}
            variant="outlined"
            defaultValue={userInput}
            label="Type your solution"
            onChange={(e) => {
              setUserInput(e.target.value)
            }}
          />
        </Box>
      </DialogContent>
    </>
  )
}

type InterceptChildrenProps = {
  /**
   * Elements to intercept
   */
  children: JSX.Element | JSX.Element[]
  /**
   * Whether to stopPropagation on passed event
   */
  stopPropagation?: boolean
  /**
   * function list to intercept. You can pass [String] or String
   */
  intercept?: string | [string]

  setCurrentEvent: React.Dispatch<React.SetStateAction<SyntheticEvent | undefined>>
  setCurrentFunction: React.Dispatch<React.SetStateAction<CurrentFunction>>
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>
  /**
   * Forwared ref from confirmation
   */
  forwardedRef?: React.ForwardedRef<JSX.Element>
}

function InterceptChildren({
  intercept,
  children,
  stopPropagation,
  setCurrentEvent,
  setCurrentFunction,
  setShowDialog,
  forwardedRef,
}: InterceptChildrenProps): JSX.Element {
  if (typeof intercept === 'string') {
    intercept = [intercept]
  } else {
    intercept = intercept ?? ['onClick']
  }

  return (
    <>
      {React.Children.map(children, (child) => {
        const interceptions = (intercept as Array<string>).reduce((result, func) => {
          if (child.props[func]) {
            const some = (event?: SyntheticEvent) => {
              event?.persist()
              if (event && stopPropagation && event.stopPropagation) {
                event.stopPropagation()
              }
              setCurrentFunction(() => child.props[func])
              setCurrentEvent(() => event)
              setShowDialog(() => true)
            }

            result[func] = some
          }
          return result
        }, {} as Record<string, (event?: SyntheticEvent) => void>)

        return React.cloneElement(child, { ...interceptions, ref: forwardedRef })
      })}
    </>
  )
}

type ConfirmationDialogProps = {
  /**
   * optional title to use as dialog title
   */
  title?: string

  /**
   * String for the confirmation button label
   */
  confirmationTitle?: string

  /**
   * String for the cancel button label
   */
  cancelTitle?: string

  /**
   * Handler for get a cancel information
   */
  onCancel?: (event: MouseEvent<HTMLButtonElement>) => void
  /**
   * Level for confirm. Hard will ask the user to type the confirmationTitle
   */
  level?: /*'normal' | 'hard'*/ string
}

function ConfirmationDialog({
  closeDialog,
  title,
  level,
  userInput,
  error,
  isValid,
  confirmationTitle,
  equation,
  setUserInput,
  cancelTitle,
  onCancel,
  handleConfirmation,
}: ConfirmationDialogProps & {
  closeDialog: () => void
  handleConfirmation: (event: MouseEvent<HTMLButtonElement>) => void
  setUserInput: (value: string) => void
  userInput: string
  equation: string
  error: boolean
  isValid: boolean
}): JSX.Element {
  return (
    <>
      <Dialog open onClose={() => closeDialog} TransitionComponent={Transition}>
        {title && <DialogTitle>{title}</DialogTitle>}
        <Box margin="20px">
          <SuggestionShop />
        </Box>
        <DialogActions>
          <Button
            variant="text"
            color="inherit"
            onClick={(event: MouseEvent<HTMLButtonElement>) => {
              onCancel?.(event)
              //TODO: dispatch unselect shop
              closeDialog()
            }}
          >
            {cancelTitle}
          </Button>
          <Button color="primary" variant="contained" onClick={handleConfirmation} disabled={isValid === false}>
            {confirmationTitle}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

type CurrentFunction = ((...args: unknown[]) => void) | null
type CurrentEvent = unknown | null

export default forwardRef<JSX.Element, ConfirmationProps>(function Confirmation(
  {
    cancelTitle = 'cancel',
    confirmationTitle = 'Ok',
    intercept = 'onClick',
    level = 'normal',
    stopPropagation = false,
    title,
    onCancel,
    children,
  }: ConfirmationProps,
  ref,
): JSX.Element {
  const [showDialog, setShowDialog] = useState(false)
  const [currentFunction, setCurrentFunction] = useState<CurrentFunction>(null)
  const [currentEvent, setCurrentEvent] = useState<CurrentEvent>(null)
  const [userInput, setUserInput] = useState('')
  const [error, setError] = useState(false)

  const leftNumber = useMemo(() => Math.floor(Math.random() * 100 + 1), [])
  const rightNumber = useMemo(() => Math.floor(Math.random() * 100 + 1), [])
  const operator = useMemo(() => ['+', '-', '*'][Math.floor(Math.random() * 3)], [])

  function closeDialog() {
    setShowDialog(false)
  }
  function validateLevel() {
    if (level === 'hard') {
      const userNumber = parseInt(userInput, 10)
      switch (operator) {
        case '+':
          return userNumber === leftNumber + rightNumber
        case '-':
          return userNumber === leftNumber - rightNumber
        case '*':
          return userNumber === leftNumber * rightNumber
      }
    }
    return true
  }

  function handleConfirmation(event: MouseEvent<HTMLButtonElement>) {
    if (event && stopPropagation && event.stopPropagation) {
      event.stopPropagation()
    }
    if (validateLevel()) {
      currentFunction?.(currentEvent)
      closeDialog()
    } else {
      setError(true)
    }
  }

  const confirmationDialogProps: ConfirmationDialogProps & {
    closeDialog: () => void
    handleConfirmation: (event: MouseEvent<HTMLButtonElement>) => void
    setUserInput: (value: string) => void
    userInput: string
    error: boolean
    equation: string
    isValid: boolean
  } = {
    closeDialog,
    title,
    level,
    userInput,
    error,
    isValid: validateLevel(),
    equation: `${leftNumber} ${operator} ${rightNumber}`,
    confirmationTitle,
    setUserInput,
    cancelTitle,
    onCancel,
    handleConfirmation,
  }
  const interceptChildrenProps: InterceptChildrenProps = {
    children,
    stopPropagation,
    intercept,
    setCurrentEvent,
    setCurrentFunction,
    setShowDialog,
  }
  return (
    <>
      <InterceptChildren forwardedRef={ref} {...interceptChildrenProps} />
      {showDialog ? <ConfirmationDialog {...confirmationDialogProps} /> : ''}
    </>
  )
})
