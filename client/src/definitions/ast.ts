/**
 * Types representing AST
 * 
 * @module AST
 */

/** This comment is needed so that TypeDoc parses the above one correctly */
import * as Graph from './graph';

/**
* TODO
*/
interface Range {
  block: string
  start: number
  end: number
}

interface Error { 
  number : number
  message : string
  range : Range 
}

interface Type {

}

interface Syntax<T> { 
  syntax : T
  range : Range
  node : Graph.Node | null
}

