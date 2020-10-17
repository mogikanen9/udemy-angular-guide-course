export class LoggingService {

    info(msg: any): void {
        console.log(msg);

    }

    debug(msg0: any, msg1?: any): void {
        if (msg1) {
            console.log(msg0, msg1);
        } else {
            console.log(msg0);
        }
    }

    error(msg: string, msg1: any): void {
        this.debug(msg, msg1);
    }
}