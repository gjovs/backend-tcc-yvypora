import db from '../lib/prisma';

import { Costumer } from '../../proto/register';

class CostumerModel {
    async createCostumer(data: Costumer) {
        try {
            const res = await db.costumer.create({
                data: {}
            })
            return res
        } catch (error) {
            return { error: true, message: error.message }
        }
    }

}

export default new CostumerModel();
