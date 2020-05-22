<?php

/**
 * @file
 * Contains \Drupal\interactive_outlooks\Plugin\Block\GlobalTropicsBlock.
 */

namespace Drupal\interactive_outlooks\Plugin\Block;
use Drupal\Core\Block\Blockbase;


/**
 * Provides a 'Global Tropics Hazards Outlook' block
 *
 * @Block(
 *  id = "interactive_global_tropics_outlooks",
 *  admin_label = @Translation("Interactive Global Tropics Hazards outlooks"),
 *  category = @Translation("CPC Outlooks"),
 * )
 */

class GlobalTropicsBlock extends Blockbase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    //Fetch data
    return [
      '#theme' => 'global_tropics_map',
      '#attached' => [
        'library' => [
          'interactive_outlooks/global_tropics',
        ],
      ],
    ];

  }

}
