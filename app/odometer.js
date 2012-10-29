var StreamOdometerObj = {
  // Parameters
    backgroundSprite : {},
    slideSpeed : {},
    odometerBgPosition : {},
    animatePrice: true,     // used to allow user to turn off animated effects
  
    // Background coordinates of Large/Default sprite
    backgroundSpriteDefault : "/bzJApp/views/site/fallingStarAuctions/images/cssImages/fsCurrencyCountdown.png",
    slideSpeedDefault : "40",
    odometerBgPositionDefault : {
      
    // key             xpos  ypos
      0 : new Array('-3px', 0), 
      9 : new Array('-44px', 0),
      8 : new Array('-83px', 0),
      7 : new Array('-124px', 0),
      6 : new Array('-163px', 0),
      5 : new Array('-203px', 0),
      4 : new Array('-243px', 0),
      3 : new Array('-282px', 0),
      2 : new Array('-323px', 0),
      1 : new Array('-363px', 0),
      'empty' : new Array('-435px', 0),
      'comma' : new Array('-415px', '-84px')
    },
  
    // Background coordinates of Small sprite
    backgroundSpriteSmall : "/bzJApp/views/site/fallingStarAuctions/images/cssImages/fsCurrencyCountdown_small.png",
    slideSpeedSmall : "16",
    odometerBgPositionSmall : {
      
    // key             xpos  ypos
      0 : new Array('0px', 0), 
      9 : new Array('-23px', 0),
      8 : new Array('-46px', 0),
      7 : new Array('-70px', 0),
      6 : new Array('-94px', 0),
      5 : new Array('-117px', 0),
      4 : new Array('-141px', 0),
      3 : new Array('-164px', 0),
      2 : new Array('-188px', 0),
      1 : new Array('-211px', 0),
      'empty' : new Array('-254px', 0),
      'comma' : new Array('-242px', '-52px')
    },
  // END: Set Parameters

  // Methods
    roateOdometerValue : function(incomingObj, outgoingObj, incomingValue, animate){
      if(animate){
        // incoming number
        incomingObj.css({
          'top':'-40px',
          'left':'0',
          'background':'url(' + this.backgroundSprite + ') no-repeat ' + this.odometerBgPosition[incomingValue][0] + ' ' + this.odometerBgPosition[incomingValue][1]
        }).show().animate({top:'0px', 'left':'0'}, {duration: 300, queue: false});
        
        // outgoing number
        outgoingObj.animate({
          top : '40px'
        }, {
          queue: false, 
          duration: 300, 
          complete: function() {
            outgoingObj.hide();
          }
        });
      }else{
        // failsafe to help prevent empty digits after a transiation
        // populate digit even if the incoming value is the same as the outgoing value
        
        // incoming number
        incomingObj.css({
          'top':'0',
          'left':'0',
          'background':'url(' + this.backgroundSprite + ') no-repeat ' + this.odometerBgPosition[incomingValue][0] + ' ' + this.odometerBgPosition[incomingValue][1]
        }).show();
        
        // outgoing number
        outgoingObj.hide();
      }
    },
    manuallyUpdateJqueryObjs : function(objects, action, bgImageKey){
      this.objects = objects;
      this.action = action;
      this.bgImageKey = bgImageKey;
      
      for (this.i in this.objects){
        this.currentObj = this.jQueryObjects[this.objects[this.i]];
        
        if(this.currentObj != null){
          this.currentObj.css({'background':'url(' + this.backgroundSprite + ') no-repeat ' + this.odometerBgPosition[bgImageKey][0] + ' ' + this.odometerBgPosition[bgImageKey][1]});
        }
      }
    },
    populateOdometer : function(streamId, price, auctionId, spriteSize){
      this.streamId   = streamId;     
      nf.setNumber(price);
      this.price = nf.toUnformatted();
      
      // animate rotation if global animation setting is turned on
      if(this.animatePrice){
        // params
          //this.price    = '999999';  // use this to test positions of background image
          this.price      = this.price.toString();
          this.priceLength  = this.price.length;
          
          this.spriteSize   = spriteSize;
          
          if(this.spriteSize != null || StreamAuction.isPromoPage == true){
            this.odometerBgPosition = this.odometerBgPositionSmall;
            this.backgroundSprite = this.backgroundSpriteSmall;
            this.slideSpeed = this.slideSpeedSmall;
          }else{
            this.odometerBgPosition = this.odometerBgPositionDefault;
            this.backgroundSprite = this.backgroundSpriteDefault;
            this.slideSpeed = this.slideSpeedDefault;
          }
        
          this.jQueryObjects = {
            'digit_1' : jQuery('#' + this.streamId + ' span.digit_1'),
            'digit_2' : jQuery('#' + this.streamId + ' span.digit_2'),
            'digit_3' : jQuery('#' + this.streamId + ' span.digit_3'),
            'digit_4' : jQuery('#' + this.streamId + ' span.digit_4'),
            'digit_5' : jQuery('#' + this.streamId + ' span.digit_5'),
            'digit_6' : jQuery('#' + this.streamId + ' span.digit_6'),
            'digit_comma' : jQuery('#' + this.streamId + ' span.digit_comma'),
            
            'digit_1_next' : jQuery('#' + this.streamId + ' span.digit_1_next'),
            'digit_2_next' : jQuery('#' + this.streamId + ' span.digit_2_next'),
            'digit_3_next' : jQuery('#' + this.streamId + ' span.digit_3_next'),
            'digit_4_next' : jQuery('#' + this.streamId + ' span.digit_4_next'),
            'digit_5_next' : jQuery('#' + this.streamId + ' span.digit_5_next'),
            'digit_6_next' : jQuery('#' + this.streamId + ' span.digit_6_next'),
            'digit_comma_next' : jQuery('#' + this.streamId + ' span.digit_comma_next')
          };
        // END: params
      
        // Show and hide fields that are not being used
          switch(this.priceLength){
            case 1:
              // empty these digits
              this.jQueryObjs = [
                'digit_6', 'digit_5', 'digit_4', 'digit_3', 'digit_2', 'digit_comma', 
                'digit_6_next', 'digit_5_next', 'digit_4_next', 'digit_3_next', 'digit_2_next', 'digit_comma_next'
              ];
              this.manuallyUpdateJqueryObjs(this.jQueryObjs, 'update', 'empty');
            break
            case 2:
              // empty these digits
              this.jQueryObjs = [
                'digit_6', 'digit_5', 'digit_4', 'digit_3', 'digit_comma', 
                'digit_6_next', 'digit_5_next', 'digit_4_next', 'digit_3_next', 'digit_comma_next'];
              this.manuallyUpdateJqueryObjs(this.jQueryObjs, 'update', 'empty');
            break
            case 3:
              // empty these digits
              this.jQueryObjs = [
                'digit_6', 'digit_5', 'digit_4', 'digit_comma', 
                'digit_6_next', 'digit_5_next', 'digit_4_next', 'digit_comma_next'
              ];
              this.manuallyUpdateJqueryObjs(this.jQueryObjs, 'update', 'empty');
            break
            case 4:
              // empty these digits
              this.jQueryObjs = [
                'digit_6', 'digit_5', 
                'digit_6_next', 'digit_5_next'
              ];
              this.manuallyUpdateJqueryObjs(this.jQueryObjs, 'update', 'empty');
              
              // show comma
              this.jQueryObjs = ['digit_comma', 'digit_comma_next'];
              this.manuallyUpdateJqueryObjs(this.jQueryObjs, 'update', 'comma');
            break
            case 5:
              // empty these digits
              this.jQueryObjs = ['digit_6', 'digit_6_next'];
              this.manuallyUpdateJqueryObjs(this.jQueryObjs, 'update', 'empty');
              
              // show comma
              this.jQueryObjs = ['digit_comma', 'digit_comma_next'];
              this.manuallyUpdateJqueryObjs(this.jQueryObjs, 'update', 'comma');
            break
            case 6:
              // show comma
              this.jQueryObjs = ['digit_comma', 'digit_comma_next'];
              this.manuallyUpdateJqueryObjs(this.jQueryObjs, 'update', 'comma');
            break
          }
        // END: Show and hide fields that are not being used
      
      
        // Rotate the Odometer
          this.count = this.priceLength;
          for(c=0; c<this.price.length; c++){
            incomingValue = this.price.charAt(c);
            
            switch(this.count){
              case 1:
                if(this.jQueryObjects['digit_1'].is(":visible")){
                  incomingObj = this.jQueryObjects['digit_1_next'];
                  outgoingObj = this.jQueryObjects['digit_1'];
                }else{
                  incomingObj = this.jQueryObjects['digit_1'];
                  outgoingObj = this.jQueryObjects['digit_1_next'];
                }
              break
              case 2:
                if(this.jQueryObjects['digit_2'].is(":visible")){
                  incomingObj = this.jQueryObjects['digit_2_next'];
                  outgoingObj = this.jQueryObjects['digit_2'];
                }else{
                  incomingObj = this.jQueryObjects['digit_2'];
                  outgoingObj = this.jQueryObjects['digit_2_next'];
                }
              break
              case 3:
                if(this.jQueryObjects['digit_3'].is(":visible")){
                  incomingObj = this.jQueryObjects['digit_3_next'];
                  outgoingObj = this.jQueryObjects['digit_3'];
                }else{
                  incomingObj = this.jQueryObjects['digit_3'];
                  outgoingObj = this.jQueryObjects['digit_3_next'];
                }
              break
              case 4:
                if(this.jQueryObjects['digit_4'].is(":visible")){
                  incomingObj = this.jQueryObjects['digit_4_next'];
                  outgoingObj = this.jQueryObjects['digit_4'];
                }else{
                  incomingObj = this.jQueryObjects['digit_4'];
                  outgoingObj = this.jQueryObjects['digit_4_next'];
                }
              break
              case 5:
                if(this.jQueryObjects['digit_5'].is(":visible")){
                  incomingObj = this.jQueryObjects['digit_5_next'];
                  outgoingObj = this.jQueryObjects['digit_5'];
                }else{
                  incomingObj = this.jQueryObjects['digit_5'];
                  outgoingObj = this.jQueryObjects['digit_5_next'];
                }
              break
              case 6:
                if(this.jQueryObjects['digit_6'].is(":visible")){
                  incomingObj = this.jQueryObjects['digit_6_next'];
                  outgoingObj = this.jQueryObjects['digit_6'];
                }else{
                  incomingObj = this.jQueryObjects['digit_6'];
                  outgoingObj = this.jQueryObjects['digit_6_next'];
                }
              break
              default :
                incomingObj = null;
                outgoingObj = null;
            }
            
            if(incomingObj != null && outgoingObj != null){
              if(incomingObj.html() != incomingValue){
                this.roateOdometerValue(incomingObj, outgoingObj, incomingValue, true);
              }else{
                this.roateOdometerValue(incomingObj, outgoingObj, incomingValue, false);
              }
              outgoingObj.html(incomingValue);
            }
            
            this.count--;
          }
        // END: Rotate the Odometer
      }else{
        // update static price without animated jquery effect
        $('#' + this.streamId + ' div.nonAnimatedDigits').html(this.price);
      }
    },
    
    // if animation setting is turned off by the user, then hide the digits that would normally rotate
    toggleDisplayDigits: function(status){
      if(status == 'hide'){
        $('div.animatedDigits').hide();
        $('div.nonAnimatedDigits').slideDown().show();
      }else{
        $('div.animatedDigits').slideDown().show();
        $('div.nonAnimatedDigits').hide();
      }
    }
  // END: Methods
};


objPopulateStaticOdometer = {
  // Initialize
    _create: function(closingPrice){
      nf.setNumber(closingPrice);
      closingPrice = nf.toUnformatted();
      this.closingPrice = closingPrice.toString();
      this.closingPriceLength = this.closingPrice.length
      
      this._init();
    },
    _init: function(){
      $('div.animatedDigits').show()
      this.showHideUnusedDigits();
      this.parseIncomingValue();
    },
  // END: Initialize
  
  // Methods
    // Hide digits that are not being used
      hideDigits: function(digits, mode){
        for(i=0; i<digits.length; i++){
          $('span.digit_' + digits[i]).css({
            'background':'url(' + StreamOdometerObj.backgroundSpriteSmall + ') no-repeat ' + 
            StreamOdometerObj.odometerBgPositionSmall['empty'][0] + ' ' + 
            StreamOdometerObj.odometerBgPositionSmall['empty'][1]});
        }
      },
    // END: Hide digits that are not being used
    
    // Show/Hide comma
      hideComma: function(display){
        if(display){
          $('span.digit_comma').css({'background':'url(' + StreamOdometerObj.backgroundSpriteSmall + ') no-repeat ' + StreamOdometerObj.odometerBgPositionSmall['empty'][0] + ' ' + StreamOdometerObj.odometerBgPositionSmall['empty'][1]});
        }else{
          $('span.digit_comma').css({'background':'url(' + StreamOdometerObj.backgroundSpriteSmall + ') no-repeat ' + StreamOdometerObj.odometerBgPositionSmall['comma'][0] + ' ' + StreamOdometerObj.odometerBgPositionSmall['comma'][1]});
        }
      },
    // END: ShowHide comma
    
    // Rotate Incoming Value
      rotateStaticOdometerValue: function(incomingObj, incomingValue){
        // incoming number
        incomingObj.css({
          'top':'0px',
          'left':'0',
          'background':'url(' + StreamOdometerObj.backgroundSpriteSmall + ') no-repeat ' + StreamOdometerObj.odometerBgPositionSmall[incomingValue][0] + ' ' + StreamOdometerObj.odometerBgPositionSmall[incomingValue][1]
        }).show();
      },
      
      // Show/Hide unused digits
        showHideUnusedDigits: function(){
          switch(this.closingPriceLength){
            case 1:
              digits = [2, 3, 4, 5, 6];
              this.hideDigits(digits);
              this.hideComma(true);
            break
            case 2:
              digits = [3, 4, 5, 6];
              this.hideDigits(digits);
              this.hideComma(true);
            break
            case 3:
              digits = [4, 5, 6];
              this.hideDigits(digits);
              this.hideComma(true);
            break
            case 4:
              digits = [5, 6];
              this.hideDigits(digits);
              this.hideComma(false);
            break
            case 5:
              digits = [6];
              this.hideDigits(digits);
              this.hideComma(false);
            break
            case 6:
              this.hideComma(false);
            break
          }
        },
      // Show/Hide unused digits
      
      // Parse Incoming Value
        parseIncomingValue: function(){
          count = this.closingPriceLength;
          for(c=0; c<this.closingPriceLength; c++){
            incomingValue = this.closingPrice.charAt(c);
            
            switch(count){
              case 1:
                incomingObj = $('span.digit_1');
              break
              case 2:
                incomingObj = $('span.digit_2');
              break
              case 3:
                incomingObj = $('span.digit_3');
              break
              case 4:
                incomingObj = $('span.digit_4');
              break
              case 5:
                incomingObj = $('span.digit_5');
              break
              case 6:
                incomingObj = $('span.digit_6');
              break
              default :
                incomingObj = null;
            }

            if(incomingObj != null)
              this.rotateStaticOdometerValue(incomingObj, parseInt(incomingValue));
            
            count--;
          }
        }
      // END: Parse Incoming Value
    // END: Rotate Incoming Value
  // END: Methods
};