<?php

/**
 * @file
 * Contains \Drupal\interactive_outlooks\Plugin\Block\TempBlock.
 */

namespace Drupal\interactive_outlooks\Plugin\Block;
use Drupal\Core\Block\Blockbase;

/**
 * Provides a 'Temperature Outlook' block
 *
 * @Block(
 *  id = "interactive_temp_outlooks",
 *  admin_label = @Translation("Interactive Temperature outlooks"),
 *  category = @Translation("CPC Outlooks"),
 * )
 */

class TempBlock extends Blockbase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    //Fetch data
    return [
      '#theme' => 'temp_map',
      '#attached' => [
        'library' => [
          'interactive_outlooks/temp',
        ],
      ],
    ];

  }

}
