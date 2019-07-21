<?php

/**
 * @file
 * Contains \Drupal\interactive_outlooks\Plugin\Block\HazardsBlock.
 */

namespace Drupal\interactive_outlooks\Plugin\Block;
use Drupal\Core\Block\Blockbase;

/**
 * Provides a 'Hazards Outlook' block
 *
 * @Block(
 *  id = "interactive_hazards_outlooks",
 *  admin_label = @Translation("Interactive Hazards outlooks"),
 *  category = @Translation("CPC Outlooks"),
 * )
 */

class HazardsBlock extends Blockbase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    //Fetch data
    return [
      '#theme' => 'hazards_map',
      '#attached' => [
        'library' => [
          'interactive_outlooks/hazards',
        ],
      ],
    ];

  }

}
