import { BaseNode, CallExpression } from "estree";

/**
 * Predicate function for determining `CallExpression` nodes
 * @param node Node
 */
export const is_call_expression_node = (
  node?: BaseNode | null
): node is CallExpression => {
  return Boolean(node?.type === "CallExpression");
};
