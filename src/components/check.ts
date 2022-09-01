// import { defineMode } from "codemirror"
// defineMode()

import { ModeFactory, EditorConfiguration, Mode } from "codemirror"

interface CheckState {
  line: number
}

export const state: CheckState = {
  line: 0,
}

const config: EditorConfiguration = {

}

export const checkModeFactory: ModeFactory<CheckState> = (config, state) => {
  const checkMode: Mode<CheckState> = {
    name: 'check',
    token: (stream, state) => {
      if (stream.match(/([0-9]+)([.,]+)([0-9]+)/)) {
        return 'number'
      }
      else if (stream.match(/([0-9]+)/)) {
        return 'number'
      }
      else if (stream.match(/[A-z]+/)) {
        return 'alphabet'
      }
      else if (stream.match(' ')) {
        return 'halfspace'
      }
      else if (stream.match('　')) {
        return 'fullspace'
      }
      else if (stream.match('[画像]')) {
        return 'figure'
      }
      stream.next()
      return null
    },
    startState: () => state,
  }
  return checkMode
}
