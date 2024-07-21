/* @flow */

import * as nodeOps from 'web/runtime/node-ops'
import { createPatchFunction } from 'core/vdom/patch'
import baseModules from 'core/vdom/modules/index'
import platformModules from 'web/runtime/modules/index'

// the directive module should be applied last, after all
// built-in modules have been applied.
const modules = platformModules.concat(baseModules)

/**
 * nodeOps 封装的 DOM 操作的方法
 * modules 模块的钩子函数 ref 和 directive
 * 这么实现是为了方便兼容多端
 */
export const patch: Function = createPatchFunction({ nodeOps, modules })
