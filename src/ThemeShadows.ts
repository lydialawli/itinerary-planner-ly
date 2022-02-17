import { Shadows } from '@material-ui/core/styles/shadows'

const shadowByIndex = (index: number) => {
  const elevation = index
  if (elevation === 0) return 'none'
  const percentage = elevation / 24

  const firstY = 1
  const firstRadius = 2
  const firstSpread = -1

  const secondY = Math.ceil(percentage * 30)
  const secondRadius = Math.ceil(percentage * 60)
  const secondSpread = Math.ceil(percentage * -20)

  const thirdY = Math.ceil(percentage * 9)
  const thirdRadius = Math.ceil(percentage * 46)
  const thirdSpread = Math.ceil(percentage * -22)

  const first = `0px ${firstY}px ${firstRadius}px ${firstSpread}px rgba(0,0,0,0.1)`
  const second = `0px ${secondY}px ${secondRadius}px ${secondSpread}px rgba(0,0,0,0.1)`
  const third = `0px ${thirdY}px ${thirdRadius}px ${thirdSpread}px rgba(0,0,0,0.05)`
  return [first, second, third].join(',')
}

export default Array.from(new Array(25)).map((_, index) => shadowByIndex(index)) as Shadows
