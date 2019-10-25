<?php

/**
 * @file
 * Contains \Drupal\interactive_outlooks\Plugin\Block\PrecipBlock.
 */

namespace Drupal\interactive_outlooks\Plugin\Block;
use Drupal\Core\Block\Blockbase;

/**
 * Provides a 'Precipitation Outlook' block
 *
 * @Block(
 *  id = "interactive_precip_outlooks",
 *  admin_label = @Translation("Interactive Precipitation outlooks"),
 *  category = @Translation("CPC Outlooks"),
 * )
 */

class PrecipBlock extends Blockbase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    //Fetch data
    return [
      '#theme' => 'precip_map',
      '#attached' => [
        'library' => [
          'interactive_outlooks/precip',
        ],
      ],
    ];

  }

}
