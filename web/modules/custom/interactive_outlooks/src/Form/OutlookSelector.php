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
    return 'interactive_outlooks_selector';
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
        'global-tropics' => $this->t('Global Tropics Hazards Outlook'),
        'week34' => $this->t('Week 3 - 4 Outlook')
      ],
      '#form_attributes' => [
        'class' => 'usa-form',
        //'for' => 'outlook-options',
      ],
      '#label_attributes' => [
        'class' => 'usa-label',
        'for' => 'outlook-options',
      ],
    ];
    $form['#theme'] = 'outlook_selector';
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
    $temp_map = [
      '#theme' => 'temp_map',
      //'#test_var' => 'test variable',
    ];
    $precip_map = [
      '#theme' => 'precip_map',
      //'#test_var' => 'test variable',
    ];
    $hazards_map = [
      '#theme' => 'hazards_map',
      //'#test_var' => 'test variable',
    ];
    $drought_map = [
      '#theme' => 'drought_map',
      //'#test_var' => 'test variable',
    ];
    $global_tropics_map = [
      '#theme' => 'global_tropics_map',
    ];
    $week34_map = [
      '#theme' => 'week34_map',
    ];

    $response = new AjaxResponse();
    // Check if the select field has a selected option.
    if ($selectedValue = $form_state->getValue('outlooks_select')) {
      // Get the text of the selected option.
      //$selectedText = $form['outlooks_select']['#options'][$selectedValue];
      if ($selectedValue = 'temp'){

      }
      switch ($selectedValue) {
        case 'temp':
          $rendered = \Drupal::service('renderer')->render($temp_map);
          $response->addCommand(new ReplaceCommand($rendered));
          break;
        case 'precip':
          //
          break;
        case 'hazards':
          //code
          break;
        case 'drought':
          //
          break;
        case 'global-tropics':
          //
          break;
        case 'week34':
          //
          break;
        default:
          // show temp block
      }
      // Place the text of the selected option in our textfield.
      //$form['output']['#value'] = $selectedText;
    }
    return $response;
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
