<?php

/**
 * @file
 * Contains \Drupal\interactive_outlooks\Plugin\Block\DroughtsBlock.
 */

namespace Drupal\interactive_outlooks\Plugin\Block;
use Drupal\Core\Block\Blockbase;

/**
 * Provides a 'Drought Outlook' block
 *
 * @Block(
 *  id = "interactive_droughts_outlooks",
 *  admin_label = @Translation("Interactive Droughts outlooks"),
 *  category = @Translation("CPC Outlooks"),
 * )
 */

class DroughtsBlock extends Blockbase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    //Fetch data
    return [
      '#theme' => 'droughts_map',
      '#attached' => [
        'library' => [
          'interactive_outlooks/droughts',
        ],
      ],
    ];

  }

}
