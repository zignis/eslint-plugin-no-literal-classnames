import { BaseNode, JSXAttribute } from "estree-jsx";

/**
 * Predicate function for determining `JSXAttribute` nodes
 * @param node Node
 */
export const is_jsx_attribute_node = (
  node?: BaseNode | null
): node is JSXAttribute => {
  return Boolean(node?.type === "JSXAttribute");
};
