import { Rule } from "eslint";
import {
  is_call_expression_node,
  is_conditional_expression_node,
  is_jsx_attribute_node,
  is_jsx_expression_container_node,
  is_literal_node,
  is_logical_expression_node,
  is_template_literal_node,
} from "../utils";
import { Node, BaseNode } from "estree";

export const no_literal_classnames: Rule.RuleModule = {
  /* eslint-disable prefer-snakecase/prefer-snakecase */
  meta: {
    docs: {
      description: "Disallows literal classname values for React components.",
      recommended: true,
      url: "https://github.com/zignis/eslint-plugin-no-literal-classnames/blob/main/docs/rules/no-literal-classnames.md",
    },
    schema: {
      type: "array",
      minItems: 0,
      maxItems: 2,
      items: [
        {
          enum: ["always", "never"],
        },
        {
          type: "object",
          properties: {
            whitelist: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
          additionalProperties: false,
        },
      ],
    },
    type: "problem",
  },
  /* eslint-enable prefer-snakecase/prefer-snakecase */
  create(context) {
    const [, settings = {}] = context.options;
    const whitelist: string[] = Array.isArray(settings.whitelist)
      ? settings.whitelist
      : [];

    const report_node = (node: Node, value: string) => {
      if (whitelist.includes(value)) {
        return;
      }

      context.report({
        message: `Classname must not be a string literal: \`{{ value }}\``,
        node,
        data: {
          value: value,
        },
      });
    };

    // noinspection JSUnusedGlobalSymbols
    return {
      JSXAttribute(node: BaseNode) {
        if (!is_jsx_attribute_node(node)) {
          return;
        }

        if (node.name.name !== "className") {
          return;
        }

        let maybe_literal_node: BaseNode | null = node.value;

        // Unwrap expression
        if (is_jsx_expression_container_node(node.value)) {
          maybe_literal_node = node.value.expression;
        }

        // Handle classname merge expressions
        if (is_call_expression_node(maybe_literal_node)) {
          for (const argument of maybe_literal_node.arguments) {
            // Handle `cx(someCondition ? consequent : alternate)`
            if (is_conditional_expression_node(argument)) {
              if (is_literal_node(argument.consequent)) {
                report_node(
                  argument.consequent,
                  String(argument.consequent.value)
                );
                continue;
              } else if (is_template_literal_node(argument.consequent)) {
                report_node(
                  argument.consequent,
                  String(argument.consequent.quasis[0].value.raw)
                );
                continue;
              } else if (is_literal_node(argument.alternate)) {
                report_node(
                  argument.alternate,
                  String(argument.alternate.value)
                );
                continue;
              } else if (is_template_literal_node(argument.alternate)) {
                report_node(
                  argument.alternate,
                  String(argument.alternate.quasis[0].value.raw)
                );
                continue;
              }
            }

            let maybe_literal_arg: BaseNode | null = argument;

            // Handle `cx(someCondition && someClass)`
            if (is_logical_expression_node(argument)) {
              maybe_literal_arg = argument.right;
            }

            if (is_literal_node(maybe_literal_arg)) {
              report_node(maybe_literal_arg, String(maybe_literal_arg.value));
            } else if (is_template_literal_node(maybe_literal_arg)) {
              report_node(
                maybe_literal_arg,
                String(maybe_literal_arg.quasis[0].value.raw)
              );
            }
          }
        } else if (is_literal_node(maybe_literal_node)) {
          report_node(maybe_literal_node, String(maybe_literal_node.value));
        } else if (is_template_literal_node(maybe_literal_node)) {
          report_node(
            maybe_literal_node,
            String(maybe_literal_node.quasis[0].value.raw)
          );
        }
      },
    };
  },
};
