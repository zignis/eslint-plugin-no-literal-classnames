import { BaseNode, Literal } from "estree";

/**
 * Predicate function for determining `Literal` nodes
 * @param node Node
 */
export const is_literal_node = (node?: BaseNode | null): node is Literal => {
  return Boolean(node?.type === "Literal");
};
