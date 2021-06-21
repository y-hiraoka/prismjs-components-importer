declare module "prismjs/components.json" {
  declare const components: {
    core: unknown;
    theme: unknown;
    languages: {
      meta: unknown;
      [id: string]: {
        title: string;
        alias?: string | string[];
        option?: "default";
        require?: string | string[];
        modify?: string | string[];
      };
    };
  };
  export default components;
}
