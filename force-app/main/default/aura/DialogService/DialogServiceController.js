/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2020, james@sparkworks.io
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

({
  createOverlayPopover: function (component, event, helper) {
    let params = event.getParam('arguments');

    helper.createBody(
      component,
      params,
      $A.getCallback((error, popoverBody) => {
        if (error) {
          alert('createOverlayPopover createBody error: ' + error);
          return;
        }
        if (popoverBody.isValid() && !$A.util.isUndefinedOrNull(popoverBody)) {
          component
            .find('overlayLib')
            .showCustomPopover({
              body: popoverBody,
              referenceSelector: params.referenceSelector,
              cssClass: params.cssClass
            })
            .then(
              $A.getCallback(overlay => {
                if (!$A.util.isEmpty(params.callback)) {
                  params.callback({
                    popover: overlay,
                    popoverBody: popoverBody
                  });
                }
              })
            );
        } else {
          console.error('popoverBody error is: ' + error[0].message);
        }
      })
    ); // end helper
  },
  createOverlayModal: function (component, event, helper) {
    let params = event.getParam('arguments');
    // Creating the body first - this can be a custom component or text wrapped in formattedText
    helper.createBody(
      component,
      params,
      $A.getCallback((error, modalBody) => {
        if (error) {
          alert(error);
          return;
        }
        if (modalBody.isValid() && !$A.util.isEmpty(modalBody)) {
          // if mainActionReference has a c. prefix, it means we want an action on the body just created
          let str = String(params.mainActionReference);
          if (str.startsWith('c.')) {
            params.mainActionReference = modalBody.getReference(params.mainActionReference);
          }
          helper.createButton(
            params,
            $A.getCallback((error, mainAction) => {
              if (error) {
                alert(error);
                return;
              }
              if (mainAction.isValid() && !$A.util.isEmpty(mainAction)) {
                // Final assembly
                $A.createComponent(
                  'c:ModalFooter',
                  {
                    actions: mainAction
                  },
                  (completedFooter, status, errorMessage) => {
                    if (status === 'SUCCESS') {
                      helper
                        .overlayLib(component)
                        .showCustomModal({
                          header: params.headerLabel,
                          body: modalBody,
                          footer: completedFooter,
                          showCloseButton: helper.defineShowCLoseButtonAttribute(params.showCloseButton),
                          cssClass: helper.defineLargeModalAttribute(params.isLargeModal)
                        })
                        .then(
                          $A.getCallback(overlay => {
                            if (!$A.util.isEmpty(params.bodyParams)) {
                              Object.keys(params.bodyParams).forEach((v, i, a) => {
                                let valueProviderAdded = 'v.' + v;
                                modalBody.set(valueProviderAdded, params.bodyParams[v]);
                              });
                            }
                            component.set('v.overlayPromise', overlay);
                            // prettier-ignore
                            helper.messageService(component).publish({ key: 'dialogready' });
                            if (!$A.util.isEmpty(params.callback)) {
                              params.callback(overlay);
                            }
                          })
                        );
                    }
                  }
                );
              } else {
                console.error('mainAction error is: ' + error[0].message);
              }
            })
          ); // end helper.createButton
        } else {
          console.error('modalBody error is: ' + error[0].message);
        }
      })
    ); // end helper.createBody
  },
  createOverlayModalWithEventFooter: function (component, event, helper) {
    let params = event.getParam('arguments');
    let singleton = component.find('singleton');

    helper.createBody(
      component,
      params,
      $A.getCallback((error, modalBody) => {
        if (error) {
          alert(error);
          return;
        }
        if (modalBody.isValid() && !$A.util.isEmpty(modalBody)) {
          helper.createEventFooter(
            // Helps scope messageService events from body to footer
            params.bodyParams.uniqueBoundary || null,
            $A.getCallback((error, eventFooter) => {
              helper
                .overlayLib(component)
                .showCustomModal({
                  header: params.headerLabel,
                  body: modalBody,
                  footer: eventFooter,
                  showCloseButton: true,
                  cssClass: helper.defineLargeModalAttribute(params.isLargeModal)
                })
                .then(
                  $A.getCallback(overlay => {
                    if (!$A.util.isEmpty(params.bodyParams)) {
                      Object.keys(params.bodyParams).forEach((v, i, a) => {
                        let valueProviderAdded = 'v.' + v;
                        modalBody.set(valueProviderAdded, params.bodyParams[v]);
                      });
                    }
                    component.set('v.overlayPromise', overlay);
                    helper.messageService(component).publish({ key: 'dialogready' });
                    if (!$A.util.isEmpty(params.callback)) {
                      params.callback(overlay);
                    }
                  })
                );
            })
          );
        } else {
          singleton.setIsCreatingModal(false);
          console.error('modalBody error is: ' + error[0].message);
        }
      })
    ); // end helper.createBody
  }
});