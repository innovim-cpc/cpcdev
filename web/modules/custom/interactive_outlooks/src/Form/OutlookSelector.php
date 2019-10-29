<?php

namespace Drupal\interactive_outlooks\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\ReplaceCommand;

/**
 * Implement an ajax form to toggle between outlooks
 */
class OutlookSelector extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'outlooks_selector';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    // Create a select list for outlooks
    $form['outlooks_select'] = [
      '#type' => 'select',
      '#title' => $this->t('Select an outlook'),
      '#empty_value' => '',
      '#empty_option' => '- Select an outlook -',
      '#options' => [
        'temp' => $this->t('Temperature Outlook'),
        'precip' => $this->t('Precipitation Outlook'),
        'hazards' => $this->t('Hazards Outlook'),
        'drought' => $this->t('Drought Outlook'),
      ],
    ];

    // Create the submit button.
    $form['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Select'),
      '#ajax' => [
        'callback' => '::changeOutlook',
        'wrapper' => 'outlooks-wrapper',
        'effect' => 'fade',
        'progress' => [
          'type' => 'throbber',
          //'message' => $this->t('Verifying entry...'),
        ],
      ]
    ];

    return $form;
  }


  /**
   * {@inheritdoc}
   */
  public function changeOutlook(array &$form, FormStateInterface $form_state) {
    // Check if the select field has a selected option.
    if ($selectedValue = $form_state->getValue('outlooks_select')) {
      // Get the text of the selected option.
      $selectedText = $form['outlooks_select']['#options'][$selectedValue];
      if ($selectedValue = '// TEMP: '){
        
      }
      // Place the text of the selected option in our textfield.
      //$form['output']['#value'] = $selectedText;
    }
  }


  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    parent::validateForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    // Display result.
    //foreach ($form_state->getValues() as $key => $value) {
    //  \Drupal::messenger()->addStatus($key . ': ' . $value);
  //  }
  }

}
