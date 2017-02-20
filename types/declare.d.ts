declare module 'clean-webpack-plugin';

/** fix antd version.d.ts**/
declare module "*.json" {
    const value: any;
    export default value;
	export const version: string;
}
