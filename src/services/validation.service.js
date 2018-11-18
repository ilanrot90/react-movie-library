export function validator(value, type, moviesTitles) {
    switch (type) {
        case 'Title': 
            if( moviesTitles.includes(value)) {
                return {
                    haveError: true,
                    message: ' already exist'
                }    
            }
            if(!value) {
                return {
                        haveError: true,
                        message: ' cannot be empty'
                    }                
            }

            return {
                haveError: false,
                message: ''
            }
        case 'Genre':
            if( !value.length > 0 ) {
                return {
                    haveError: true,
                    message: ' cannot be empty'
                }
            }

            return {
                haveError: false,
                message: ''
            }
        case 'Director':
            if(!/^[A-Za-z\s]+$/.test(value)) {
                return {
                        haveError: true,
                        message: ' is not valid cannot be empty'
                    }
                    
            }

            return {
                haveError: false,
                message: ''
            }

        case 'Year':
            let year = +value;
            if(!/^\d{4}$/.test(year) || year > new Date().getFullYear()) {
                return {
                        haveError: true,
                        message: ' is not valid date'
                    }                    
            }

            return {
                haveError: false,
                message: ''
            }

        case 'Runtime':
            let runtime = +value;
            if(!/\d$/.test(runtime) || runtime > 150 ) {
                return {
                        haveError: true,
                        message: ' is not valid time for this movie'
                    }                    
            }

            return {
                haveError: false,
                message: ''
            }
        default:
            return;    
    }
}