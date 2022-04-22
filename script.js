
const YEAR_HEIGHT = getWidthInDom('2022AD')[1]
const SHOW_TIME = true

const parsedTimes = parseTimes(times)

const timeline = document.getElementById('timeline')
let maxHeight = 0

// Calc height and weight
;(() => {
  let canvasHeight = 0
  let canvasWidth = 0
  for (const y in parsedTimes) {
    maxHeight = Math.max(maxHeight, parsedTimes[y].height)
    canvasHeight = Math.max(canvasHeight, parsedTimes[y].height)
    // text width + padding + line width
    canvasWidth += parsedTimes[y].width + 20 + 2
  }

  // 2 is the height of timeline + years' height + padding
  canvasHeight += 2 + YEAR_HEIGHT + 20
  canvasWidth += 2
  timeline.setAttribute('style', `width: ${canvasWidth}px; height: ${canvasHeight}px;`)
})()


// Start rendering
;(() => {
  let renderedWidth = 0
  const height = maxHeight + 20 + 2;
  for (const y in parsedTimes) {
    const splitLineEl = document.createElement('span')
    const splitLineElStyle = {
      'position': 'absolute',
      'top': '0',
      'left': `${renderedWidth}px`,
      'width': '2px',
      'height': `${height}px`,
      'background-color': '#000',
    }
    splitLineEl.setAttribute('style', styleObject2String(splitLineElStyle))
    timeline.appendChild(splitLineEl)

    const yearEl = document.createElement('span')
    const yearElStyle = {
      'position': 'absolute',
      'top': `${height}px`,
      'left': `${renderedWidth}px`,
    }
    yearEl.innerText = y
    yearEl.setAttribute('style', styleObject2String(yearElStyle))
    timeline.appendChild(yearEl)

    const downLineEl = document.createElement('span')
    const downLineElStyle = {
      'position': 'absolute',
      'top': `${height - 2}px`,
      'left': `${renderedWidth + 2}px`,
      'width': `${parsedTimes[y].width + 20}px`,
      'height': '2px',
      'background-color': '#000',
    }
    downLineEl.setAttribute('style', styleObject2String(downLineElStyle))
    timeline.appendChild(downLineEl)

    let renderedHeight = 0
    for (const e of parsedTimes[y].events) {
      const msgEl = document.createElement('span')
      const msgElStyle = {
        'position': 'absolute',
        'top': `${renderedHeight}px`,
        'left': `${renderedWidth + 2}px`,
        'width': 'fit-content',
        'max-width': '300px',
        'padding': '3px',
        'border': '1px solid #000',
      }
      msgEl.innerText = e.msg
      msgEl.setAttribute('style', styleObject2String(msgElStyle))
      timeline.appendChild(msgEl)
      renderedHeight += msgEl.clientHeight + 20
    }
    renderedWidth += parsedTimes[y].width + 20 + 2
  }
})()

function styleObject2String(obj) {
  let res = ''
  for (const key in obj)
    res += `${key}: ${obj[key]}; `
  return res
}

function getWidthInDom(str, isMsg) {
  const el = document.createElement('div')
  el.classList.add('text-calc')
  if (isMsg === true) el.classList.add('text-calc-msg')
  el.innerText = str
  document.documentElement.appendChild(el)
  const width = el.clientWidth
  const height = el.clientHeight
  el.remove()
  // 20px is the padding
  return isMsg ? [width, height + 20] : [width, height]
}

function parseTimes(t) {
  let res = {}
  for (const con of t) {
    const split = con.time.split('.')

    // year
    if (!(split[0].endsWith('AD') || split[0].endsWith('BC'))) {
      const n0 = parseInt(split[0])
      if (isNaN(n0)) {
        console.error('Invalid year: ' + split[0])
        alert('Invalid year: ' + split[0])
        continue
      }
      split[0] = Math.abs(n0) + (n0 < 0 ? 'BC' : 'AD')
    }
    
    // parseInt except year
    for (let i = 1; i < split.length; i++) {
      const n = parseInt(split[i])
      if (isNaN(n)) {
        console.error('Invalid number: ' + split[i])
        alert('Invalid number: ' + split[i])
        continue
      }
      split[i] = n
    }

    const message = SHOW_TIME ? `${split.join('.')}\n${con.msg}` : con.msg
    const wh = getWidthInDom(message, true)
    if (res[split[0]] === undefined) {
      res[split[0]] = {
        events: [{ time: split, msg: message }],
        width: wh[0],
        height: wh[1],
      }
    } else {
      res[split[0]].events.push({ time: split, msg: message })
      if (wh[0] > res[split[0]].width)
        res[split[0]].width = wh[0]
      res[split[0]].height += wh[1]
    }
  }
  for (const y in res)
    res[y].height += 20
  return res
}
