import Realm from 'realm'
import schemas from './schemas'

// re-usable for Settings and Api
export const openDatabase = (extraOptions = {}) => {
  return Realm.open({
    schema: schemas,
    deleteRealmIfMigrationNeeded: true,
    ...extraOptions
  })
}
