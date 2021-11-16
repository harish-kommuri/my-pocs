import EXIF from 'exif-js';

export function ExIFDemo() {
    return (
        <input type="file"
            accept="image/png, image/gif, image/jpeg"
            onChange={
                (e) => {
                    const file = e.target.files[0];
                    EXIF.getData(file, function () {
                        var allMetaData = EXIF.getAllTags(this);
                        const latArr = allMetaData.GPSLatitude;
                        const latRef = allMetaData.GPSLatitudeRef;
                        const lngArr = allMetaData.GPSLongitude;
                        const lngRef = allMetaData.GPSLongitudeRef;

                        var lat = ConvertDMSToDD(latArr[0], latArr[1], latArr[2], latRef);
                        var lng = ConvertDMSToDD(lngArr[0], lngArr[1], lngArr[2], lngRef);

                        const showInMaps = confirm(`lat: ${lat} lng: ${lng} \n Do you want to check in map?`);


                        if (showInMaps) {
                            window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
                        }
                    });
                }
            }
        />
    );
}

function ConvertDMSToDD(degrees, minutes, seconds, direction) {
    var dd = degrees + minutes/60 + seconds/(60*60);
    if (direction == "S" || direction == "W") {
        dd = dd * -1;
    } // Don't do anything for N or E
    return dd;
}