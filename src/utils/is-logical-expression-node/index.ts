import { BaseNode, LogicalExpression } from "estree";

/**
 * Predicate function for determining `LogicalExpression` nodes
 * @param node Node
 */
export const is_logical_expression_node = (
  node?: BaseNode | null
): node is LogicalExpression => {
  return Boolean(node?.type === "LogicalExpression");
};
