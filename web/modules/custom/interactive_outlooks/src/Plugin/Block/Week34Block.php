<?php

/**
 * @file
 * Contains \Drupal\interactive_outlooks\Plugin\Block\Week34Block.
 */

namespace Drupal\interactive_outlooks\Plugin\Block;
use Drupal\Core\Block\Blockbase;


/**
 * Provides a 'Drought Outlook' block
 *
 * @Block(
 *  id = "interactive_week34_outlooks",
 *  admin_label = @Translation("Interactive Week 3-4 outlooks"),
 *  category = @Translation("CPC Outlooks"),
 * )
 */

class Week34Block extends Blockbase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    //Fetch data
    return [
      '#theme' => 'week34_map',
      '#attached' => [
        'library' => [
          'interactive_outlooks/week34',
        ],
      ],
    ];

  }

}
