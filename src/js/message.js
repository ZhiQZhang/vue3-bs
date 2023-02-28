import { createVNode, render } from 'vue'
import messageCom from '@/components/message/messageCom'
const div = document.createElement('div')
div.setAttribute('class', 'xtx-meassage-container')
document.body.appendChild(div)
export default ({ text, type }) => {
  let timer = null
  const vnode = createVNode(messageCom, { text, type })
  render(vnode, div)
  clearTimeout(timer)
  timer = setTimeout(() => {
    render(null, div)
  }, 1000)
}
