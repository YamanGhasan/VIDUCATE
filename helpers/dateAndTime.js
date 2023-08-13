

/**
 * calcuate and add age attribute to each document
 * 
 * @param {(mongoose.Model | mongoose.Model[])} documents - document or list of documents
 */
const ageCalculator = (documents) => {
  documents = Array.isArray(documents) ?  documents : [documents]
  const todaysDate = new Date();
  
  documents.forEach(document => {
    let documentDate = new Date(document.timestamp);

    let diffMs = (todaysDate - documentDate); // milliseconds between now & Christmas
    let diffDays = Math.floor(diffMs / 86400000); // days
    let diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

    if(diffDays >= 1) {
      document.age = `from ${diffDays} Days ago.` 
    } else if (diffHrs >= 1) {
      document.age = `from ${diffHrs} Hours ago.` 
    } else {
      document.age = `from ${diffMins} Minutes ago.` 
    }
  });
}

module.exports = {
  ageCalculator
}