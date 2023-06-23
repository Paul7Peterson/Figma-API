import type * as AST from 'figma-api/lib/ast-types';

type GeneralNode = AST.Node<keyof AST.NodeTypes>;

/** */
export function assertRectangle (name: string, doc?: GeneralNode): doc is AST.Node<'RECTANGLE'> {
  if (!doc) throw new Error(`No document for "${name}"`);
  return doc.type === 'RECTANGLE';
}

/** */
export function assertText (name: string, doc?: GeneralNode): doc is AST.Node<'TEXT'> {
  if (!doc) throw new Error(`No document for "${name}"`);
  return doc.type === 'TEXT';
}