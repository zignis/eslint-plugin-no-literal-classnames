import { BaseNode, JSXExpressionContainer } from "estree-jsx";

/**
 * Predicate function for determining `JSXExpressionContainer` nodes
 * @param node Node
 */
export const is_jsx_expression_container_node = (
  node?: BaseNode | null
): node is JSXExpressionContainer => {
  return Boolean(node?.type === "JSXExpressionContainer");
};
