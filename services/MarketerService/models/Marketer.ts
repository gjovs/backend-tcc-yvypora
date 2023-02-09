import db from "../../../db";

class Marketer {
    async getMarketers() {
        const marketers = await db.marketer.findMany()
        return marketers
    }
}

export default new Marketer()
