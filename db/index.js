import Realm from 'realm'
import schemas from './schemas'

const migration = (oldRealm, newRealm) => {
  // only apply this change if upgrading to schemaVersion 1
  if (oldRealm.schemaVersion < 1) {
    const oldObjects = oldRealm.objects('Person')
    const newObjects = newRealm.objects('Person')

    // loop through all objects and set the name property in the new schema
    for (let i = 0; i < oldObjects.length; i++) {
      newObjects[i].name = oldObjects[i].firstName + ' ' + oldObjects[i].lastName
    }
  }
}

// re-usable for Settings and Api
export const openDatabase = (extraOptions = {}) => {
  return Realm.open({
    schema: schemas,
    ...extraOptions
  })
}
