<?php

/**
 * @file
 * Contains \Drupal\interactive_outlooks\Plugin\Block\DroughtBlock.
 */

namespace Drupal\interactive_outlooks\Plugin\Block;
use Drupal\Core\Block\Blockbase;

/**
 * Provides a 'Outlooks Selector' block
 *
 * @Block(
 *  id = "interactive_outlooks_selector",
 *  admin_label = @Translation("Interactive Outlooks Selector"),
 *  category = @Translation("CPC Outlooks"),
 * )
 */

class OutlooksBlock extends Blockbase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    //$form = \Drupal::formBuilder()->getForm('\Drupal\interactive_outlooks\Form\OutlookSelector');
    //return $form;
    return [
      '#theme' => 'outlook_selector',
      '#attached' => [
        'library' => [
          'interactive_outlooks/selector',
        ],
      ],
    ];

  }

}
