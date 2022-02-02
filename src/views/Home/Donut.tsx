import React from 'react'
import makeStyles from '@mui/styles/makeStyles'
import { useTheme } from '@mui/material/styles'

export default function Donut({ values, title, subtitle }: DonutProps): JSX.Element {
  const classes = useStyles()
  const theme = useTheme()
  const sum = values.reduce((acc, { value }) => acc + value, 0)
  const normalizedValues = values.map(({ value }) => Math.round((value / sum) * 100)).filter(Boolean)
  const colors = ['#2F80ED', '#F8D348', '#6ebe23', '#f85448', '#cd2fed']

  return (
    <svg className={classes.svg} width="100%" height="100%" viewBox="0 0 42 42">
      <circle
        className={classes.circle}
        cx="21"
        cy="21"
        r="15.91549430918954"
        fill="transparent"
        stroke={theme.palette.grey['100']}
        strokeWidth="3"
      />
      {normalizedValues.map((value, index) => (
        <circle
          key={index}
          className={classes.circle}
          cx="21"
          cy="21"
          data-value={value}
          r="15.91549430918954"
          fill="transparent"
          stroke={values[index].color || colors[index]}
          strokeWidth="3"
          strokeDasharray={`${value} ${100 - value}`}
          strokeDashoffset={
            index === 0
              ? 0
              : 100 -
                normalizedValues.reduce((result, value, reduceIndex) => {
                  if (reduceIndex < index) {
                    return result + value
                  }
                  return result
                }, 0)
          }
        />
      ))}
      {title && (
        <text
          x="50%"
          y="50%"
          fontSize="7px"
          fontFamily={theme.typography.fontFamily}
          textAnchor="middle"
          fill={theme.palette.text.primary}
        >
          {title}
        </text>
      )}
      {subtitle && (
        <text
          x="50%"
          y="50%"
          dy="1.5em"
          fontSize="3px"
          fontFamily={theme.typography.fontFamily}
          textAnchor="middle"
          fill={theme.palette.text.secondary}
        >
          {subtitle}
        </text>
      )}
    </svg>
  )
}

const useStyles = makeStyles((theme) => ({
  circle: {
    animation: `$dashanimation 3000ms ${theme.transitions.easing.easeInOut}`,
    animationFillMode: 'forwards',
  },
  svg: {
    maxWidth: '250px',
    maxHeight: '250px',
    margin: '0 auto',
    display: 'block',
  },
  '@keyframes dashanimation': {
    from: {
      strokeDashoffset: '0',
      strokeDasharray: '0',
    },
    to: {},
  },
}))

export type DonutProps = {
  values: Array<{
    label?: string
    value: number
    color?: string
  }>
  title?: string
  subtitle?: string
}
