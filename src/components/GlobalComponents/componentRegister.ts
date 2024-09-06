import { App, defineAsyncComponent } from "vue";

const components = import.meta.glob("./*.vue");
export default function install(app: App): void {
  for (const [key, value] of Object.entries(components)) {
    let name = key.slice(key.lastIndexOf("/") + 1, key.lastIndexOf("."));
    name = name
      .replace(/([A-Z])/g, "-$1")
      .toLowerCase()
      .slice(1);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    app.component(name, defineAsyncComponent(value as any));
  }
}
