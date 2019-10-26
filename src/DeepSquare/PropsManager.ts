export default class PropsManager {

    [key: string]: any;

	constructor() {
		return this.$getProxy();
	}

    private $getProxy() {
        let proxy = new Proxy(this, {
    
            /*get(target, prop) {
                if(prop in target) {
                    return (target as any)[prop];
                }
                return void 0;
            }, set (target, prop, value) {
                console.log(target, prop, value);

                return true;
            }*/
        });
        return proxy;
    }
}

export { PropsManager };