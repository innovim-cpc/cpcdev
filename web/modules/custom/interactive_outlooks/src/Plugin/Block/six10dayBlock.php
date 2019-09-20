<?php

/**
 * @file
 * Contains \Drupal\interactive_outlooks\Plugin\Block\six10dayBlock.
 */

namespace Drupal\interactive_outlooks\Plugin\Block;
use Drupal\Core\Block\Blockbase;

/**
 * Provides a '6-10 day Outlook' block
 *
 * @Block(
 *  id = "interactive_six10day_outlooks",
 *  admin_label = @Translation("Interactive 6-10 day outlooks"),
 *  category = @Translation("CPC Outlooks"),
 * )
 */

class six10dayBlock extends Blockbase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    //Fetch data
    return [
      '#theme' => 'six10day_map',
      '#attached' => [
        'library' => [
          'interactive_outlooks/six10day',
        ],
      ],
    ];

  }

}
