/**
 * Slider block.
 */

/**
 * Block dependencies.
 */
import attributes from "./attributes";
import edit from "./edit";
import save from "./save";
import icon from "./icon";

/**
 * WordPress Block Libraries.
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register the block.
 */
export default registerBlockType("signalfire/slider", {
  title: __("Slider", "astra-child"),
  description: __("A simple slider.", "astra-child"),
  category: "signalfire",
  icon,
  keywords: [__("Slider Slide image", "astra-child")],
  attributes: attributes,
  supports: { align: ["full"] },
  edit,
  save,
});
