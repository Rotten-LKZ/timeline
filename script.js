
const parsedTimes = parseTimes(times)

const timeline = document.getElementById('timeline')
if (timeline.getContext) {
  const ctx = timeline.getContext('2d')
  
}

function getWidthInDom(str) {
  const el = document.createElement('div')
  el.className = 'text-width-calc'
  el.innerText = str
  document.documentElement.appendChild(el)
  const width = el.clientWidth
  el.remove()
  return width
}

function parseTimes(t) {
  let res = {}
  for (const con of t) {
    const split = con.time.split('.')

    // year
    if (split[0].endsWith('AD') || split[0].endsWith('BC')) {
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

    if (res[split[0]] === undefined) {
      res[split[0]] = {
        events: [{ time: split, msg: con.msg }],
        width: getWidthInDom(con.msg)
      }
    } else {
      res[split[0]].events.push({ time: split, msg: con.msg })
      res[split[0]].width += getWidthInDom(con.msg)
    }
  }
}
