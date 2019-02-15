#!/bin/bash

deleteSplashImages() {
    rm -f platforms/android/res/drawble*/screen.png
}

echoHeader() {
    LINE="--$(echo $1|sed s/./-/g)--"
    echo $LINE
    echo "| $1 |"
    echo $LINE
}

prerun() {
    rm -rf cordova/www/
    cp -r app cordova/www
    npm run dev
    cp ../../dist/multiws.js cordova/www
}

for arg in "$@"
do
    case $arg in
     ra)
          echoHeader "Running Android cordova project"
          prerun
          pushd cordova > /dev/null
          cordova run android
          popd > /dev/null
          ;;       
    ri)
          echoHeader "Running iOS cordova project"
          prerun
          pushd cordova > /dev/null
          cordova prepare ios
          cordova build ios --device
          popd > /dev/null

          xcodebuild -exportArchive -archivePath examples/cordova/cordova/platforms/ios/multiws.xcarchive -exportPath /Volumes/tmp -exportOptionsPlist deploy/ios/exportOptions.plist
          ;;    
     li)
          IPA="/tmp/multiws.ipa"
          touch $IPA
          echoHeader "Listening for changes on $IPA for reinstall"
          while [ true ]
          do 
            inotifywait -e close_write $IPA && ideviceinstaller -i $IPA 
          done
          ;;                       
     *)
          echoHeader "Unknown command: $arg"
          exit
          ;;             
    esac
done
