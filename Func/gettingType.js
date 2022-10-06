import React from 'react'

const gettingType = (type) => {
    switch (type) {
        case 'application/vnd.ms-powerpoint':
            return '.ppt'
        case 'application/x-7z-compressed':
            return '.7z'
        case 'application/msword':
            return '.doc'
        case 'application/pdf':
            return '.pdf'
        case 'application/sql':
            return '.sql'
        case 'application/vnd.api+json':
            return '.json'
        case 'application/vnd.oasis.opendocument.text':
            return '.odt'
        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
            return '.pptx'
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            return '.xlsx'
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return '.docx'
        case 'application/x-www-form-urlencoded':
            return '.html'
        case 'application/xml':
            return '.xml'
        case 'application/zip':
            return '.zip'
        case 'application/zstd':
            return '.zstd'
        case 'audio/mpeg':
            return '.mpeg'
        case 'audio/ogg':
            return '.ogg'
        case 'image/avif':
            return '.avif'
        case 'image/jpeg':
            return '.jpeg'
        case 'image/png':
            return '.png'
        case 'image/svg+xml':
            return '.svg'
        case 'text/css':
            return '.css'
        case 'text/csv':
            return '.csv'
        case 'text/html':
            return '.html'
        case 'text/xml':
            return '.xml'
        default:
            return  '.unkwnown';
      }

}

export default gettingType;
