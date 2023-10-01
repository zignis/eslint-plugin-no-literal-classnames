import { BaseNode, TemplateLiteral } from "estree";

/**
 * Predicate function for determining `TemplateLiteral` nodes
 * @param node Node
 */
export const is_template_literal_node = (
  node?: BaseNode | null
): node is TemplateLiteral => {
  return Boolean(node?.type === "TemplateLiteral");
};
