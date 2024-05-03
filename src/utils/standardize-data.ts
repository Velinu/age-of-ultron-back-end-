export class StandardizeData {
    public standardize(data: any) {
        data.forEach((e: any) => {
            let arrComics: [{id: Number, title: String}] = [{id: 0, title: ""}];
            let arrSeries: [{id: Number, name: String}] = [{id: 0, name: ""}];
            let arrStories: [{id: Number, name: String, type: String}] = [{id: 0, name: "", type: ""}];
            let arrEvents: [{id: Number, name: String}] = [{id: 0, name: ""}];
            
            if(e.comics){
                e.comics.items.forEach((e: any) => {
                    const part = e.resourceURI.split("/");
                    const id = part[part.length - 1];
                    arrComics.push({id: Number(id), title: e.name});
                })
            }

            if(e.series){
                e.series.items.forEach((e: any) => {
                    const part = e.resourceURI.split("/");
                    const id = part[part.length - 1];
                    arrSeries.push({id: Number(id), name: e.name});
                }) 
            }

            if(e.stories){
                e.stories.items.forEach((e: any) => {
                    const part = e.resourceURI.split("/");
                    const id = part[part.length - 1];
                    arrStories.push({id: Number(id), name: e.name, type: e.type});
                })
            }

            if(e.events){
                e.events.items.forEach((e:any) => {
                    const part = e.resourceURI.split("/");
                    const id = part[part.length - 1];
                    arrEvents.push({id: Number(id), name: e.name})
                })
            }
            
            arrSeries.shift()
            arrComics.shift()
            arrStories.shift()
            arrEvents.shift()
            e.comics = { available: e.comics.available, items: arrComics };
            e.series = { available: e.series.available, items: arrSeries };
            e.stories = { available: e.stories.available, items: arrStories }; 
            e.events = { available: e.events.available, items: arrEvents }
        })
    }

    public standardizePostCharacter = (data: any): Array<String> => {
    
        const missingFields: Array<String> = []  

        if (!data.name) {
            missingFields.push("Name");
        }
        if (!data.modified) {
            missingFields.push("Modified");
        }
        if (!data.thumbnail || !data.thumbnail.path) {
            missingFields.push("Thumbnail path");
        }
        if (!data.thumbnail || !data.thumbnail.extension) {
            missingFields.push("Thumbnail extension");
        }

        if (!data.comics || typeof data.comics.available !== 'number') {
            missingFields.push("Comics available");
        }
        if (!data.comics?.items || !Array.isArray(data.comics.items)) {
            missingFields.push("Comics items");
        } else {
            data.comics.items.forEach((item: any, index: any) => {
                if (!item.title) {
                    missingFields.push(`Comics item ${index} title`);
                }
            });
        }

        if (!data.series || typeof data.series.available !== 'number') {
            missingFields.push("Series available");
        }
        if (!data.series?.items || !Array.isArray(data.series.items)) {
            missingFields.push("Series items");
        } else {
            data.series.items.forEach((item: any, index: any) => {
                if (!item.name) {
                    missingFields.push(`Series item ${index} name`);
                }
            });
        }

        if (!data.stories || typeof data.stories.available !== 'number') {
            missingFields.push("Stories available");
        }
        if (!data.stories?.items || !Array.isArray(data.stories.items)) {
            missingFields.push("Stories items");
        } else {
            data.stories.items.forEach((item: any, index: any) => {
                if (!item.name) {
                    missingFields.push(`Stories item ${index} name`);
                }
                if (!item.type) {
                    missingFields.push(`Stories item ${index} type`);
                }
            });
        }

        if (!data.events || typeof data.events.available !== 'number') {
            missingFields.push("Events available");
        }
        if (!data.events?.items || !Array.isArray(data.events.items)) {
            missingFields.push("Events items");
        } else {
            data.events.items.forEach((item: any, index: any) => {
                if (!item.name) {
                    missingFields.push(`Events item ${index} name`);
                }
            });
        }

        if (!data.urls || !Array.isArray(data.urls)) {
            missingFields.push("URLs");
        } else {
            data.urls.forEach((item: any, index: any) => {
                if (!item.type) {
                    missingFields.push(`URLs ${index} type`);
                }
                if (!item.url) {
                    missingFields.push(`URLs ${index} url`);
                }
            });
        }
        return missingFields
    }

    public standardizePatchCharacter(data: any) {
        const invalidFields: Array<String> = [];
       
        const isValidString = (value: any) => typeof value === 'string' && value.trim().length > 0;
      
        const isValidNumber = (value: any) => typeof value === 'number' && value >= 0;
      
        if(data.id){
            invalidFields.push("Id is not aditable")
        }

        if (data.thumbnail && !isValidString(data.thumbnail.path)) {
            invalidFields.push('Thumbnail path');
        }
      
        if (data.thumbnail && !isValidString(data.thumbnail.extension)) {
            invalidFields.push('Thumbnail extension');
        }
      
        if (data.comics && !isValidNumber(data.comics.available)) {
            invalidFields.push('Comics available');
        }
      
        if (Array.isArray(data.comics?.items)) {
          data.comics.items.forEach((item: any, index: any) => {
            if (item.id && !isValidNumber(item.id)) {
              invalidFields.push(`Comics item ${index} ID`);
            }
            if (!isValidString(item.title)) {
              invalidFields.push(`Comics item ${index} title`);
            }
          });
        } else {
            invalidFields.push('Comics items (deve ser uma lista)');
        }
      
        if (data.series && !isValidNumber(data.series.available)) {
            invalidFields.push('Series available');
        }
      
        if (Array.isArray(data.series?.items)) {
          data.series.items.forEach((item: any, index: any) => {
            if (item.id && !isValidNumber(item.id)) {
              invalidFields.push(`Series item ${index} ID`);
            }
            if (!isValidString(item.name)) {
              invalidFields.push(`Series item ${index} name`);
            }
          });
        } else {
            invalidFields.push('Series items (deve ser uma lista)');
        }
      
        if (data.stories && !isValidNumber(data.stories.available)) {
            invalidFields.push('Stories available');
        }
      
        if (Array.isArray(data.stories?.items)) {
          data.stories.items.forEach((item: any, index: any) => {
            if (item.id && !isValidNumber(item.id)) {
              invalidFields.push(`Stories item ${index} ID`);
            }
            if (!isValidString(item.name)) {
              invalidFields.push(`Stories item ${index} name`);
            }
            if (!isValidString(item.type)) {
              invalidFields.push(`Stories item ${index} type`);
            }
          });
        } else {
            invalidFields.push('Stories items (deve ser uma lista)');
        }
      
        if (data.events && !isValidNumber(data.events.available)) {
            invalidFields.push('Events available');
        }
      
        if (Array.isArray(data.events?.items)) {
          data.events.items.forEach((item: any, index: any) => {
            if (item.id && !isValidNumber(item.id)) {
              invalidFields.push(`Events item ${index} ID`);
            }
            if (!isValidString(item.name)) {
              invalidFields.push(`Events item ${index} name`);
            }
          });
        } else {
            invalidFields.push('Events items (deve ser uma lista)');
        }
      
        // Verificações para URLs
        if (Array.isArray(data.urls)) {
          data.urls.forEach((item: any, index: any) => {
            if (!isValidString(item.type)) {
              invalidFields.push(`URLs ${index} type`);
            }
            if (!isValidString(item.url)) {
              invalidFields.push(`URLs ${index} url`);
            }
          });
        } else {
            invalidFields.push('URLs (deve ser uma lista)');
        }
      
        return invalidFields
    }  
}
