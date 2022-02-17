import React, { useState, SyntheticEvent, forwardRef, useMemo, MouseEvent } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Typography, Slide as Transition, Button, Dialog, DialogTitle, Checkbox, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { DirectionsBike as BikeIcon } from '@mui/icons-material'
import SuggestionShop from './SuggestionsShop'
import { DialogActions } from '@material-ui/core'
import { Container } from '../interactions/reducers/containerReducer'

export type ConfirmationProps = Omit<
  InterceptChildrenProps,
  'setCurrentEvent' | 'setCurrentFunction' | 'setShowDialog'
> &
  ConfirmationDialogProps

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
  shopId?: string
  container: Container
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
  container,
  shopId,
  level,
  userInput,
  error,
  confirmationTitle,
  equation,
  setUserInput,
  cancelTitle,
  onCancel,
  handleConfirmation,
}: ConfirmationDialogProps & {
  closeDialog: () => void
  container: Container
  shopId?: string
  handleConfirmation: (event: MouseEvent<HTMLButtonElement>) => void
  setUserInput: (value: string) => void
  userInput: string
  equation: string
  error: boolean
}): JSX.Element {
  const dispatch = useDispatch()
  const [selectedStore, setSelectedStore] = useState<string>('')
  const [backToBike, setBackToBike] = useState<boolean>(false)
  const theme = useTheme()

  const moveContainer = () => {
    if (shopId !== undefined && !!backToBike) {
      dispatch({ type: 'backToBikeStock', payload: { container, shopId } })
    } else {
      selectedStore !== '' && dispatch({ type: 'transferToStore', payload: { container, shopId: selectedStore } })
    }
  }

  return (
    <>
      <Dialog open onClose={() => closeDialog} TransitionComponent={Transition}>
        {title && <DialogTitle>{title}</DialogTitle>}
        <Box margin="20px">
          <SuggestionShop setSelectedStore={setSelectedStore} />
          {shopId !== undefined && (
            <>
              <Typography
                paddingY={theme.spacing(1)}
                textAlign="center"
                variant="body1"
                color={theme.palette.grey[500]}
              >
                or
              </Typography>
              <Grid container alignItems="center">
                <Checkbox checked={backToBike} color="primary" onClick={() => setBackToBike(!backToBike)} />
                <Typography paddingRight={theme.spacing(1)} variant="body1">
                  back to bike storage
                </Typography>
                <BikeIcon />
              </Grid>
            </>
          )}
        </Box>
        <DialogActions>
          <Button
            variant="text"
            color="inherit"
            onClick={() => {
              setSelectedStore('')
              closeDialog()
            }}
          >
            {cancelTitle}
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={(event: MouseEvent<HTMLButtonElement>) => {
              moveContainer()
              handleConfirmation(event)
            }}
          >
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
    container,
    shopId,
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

  function handleConfirmation(event: MouseEvent<HTMLButtonElement>) {
    if (event && stopPropagation && event.stopPropagation) {
      event.stopPropagation()
    }

    currentFunction?.(currentEvent)
    closeDialog()
  }

  const confirmationDialogProps: ConfirmationDialogProps & {
    closeDialog: () => void
    handleConfirmation: (event: MouseEvent<HTMLButtonElement>) => void
    setUserInput: (value: string) => void
    userInput: string
    error: boolean
    equation: string
  } = {
    closeDialog,
    title,
    container,
    shopId,
    level,
    userInput,
    error,
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
