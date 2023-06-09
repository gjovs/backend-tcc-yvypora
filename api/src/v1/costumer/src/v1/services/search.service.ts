import { getHourInSpTz, getDayOfWeek, getDayInSpTz } from "../utils";

class SearchService {
  getDateOfTheSearch(): { hour: string, dayOfWeek : string} {
    const hour = getHourInSpTz()
    const dayOfWeek = getDayOfWeek(getDayInSpTz())
    return { hour, dayOfWeek }
  }
}

export default new SearchService();