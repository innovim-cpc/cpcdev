<?php

/**
 * @file
 * Contains \Drupal\interactive_outlooks\Plugin\Block\DroughtBlock.
 */

namespace Drupal\interactive_outlooks\Plugin\Block;
use Drupal\Core\Block\Blockbase;

/**
 * Provides a 'Drought Outlook' block
 *
 * @Block(
 *  id = "interactive_drought_outlooks",
 *  admin_label = @Translation("Interactive Drought outlooks"),
 *  category = @Translation("CPC Outlooks"),
 * )
 */

class DroughtBlock extends Blockbase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    //Fetch data
    return [
      '#theme' => 'drought_map',
      '#attached' => [
        'library' => [
          'interactive_outlooks/drought',
        ],
      ],
    ];

  }

}
