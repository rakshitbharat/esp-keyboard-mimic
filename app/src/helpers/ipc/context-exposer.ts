import { exposeThemeContext } from "./theme/theme-context";
import { exposeWindowContext } from "./window/window-context";
import { exposeDeviceContext } from "./device/device-context";

export default function exposeContexts() {
  exposeWindowContext();
  exposeThemeContext();
  exposeDeviceContext();
}
