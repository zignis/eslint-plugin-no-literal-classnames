import { BaseNode, ConditionalExpression } from "estree";

/**
 * Predicate function for determining `ConditionalExpression` nodes
 * @param node Node
 */
export const is_conditional_expression_node = (
  node?: BaseNode | null
): node is ConditionalExpression => {
  return Boolean(node?.type === "ConditionalExpression");
};
