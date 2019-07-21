<?php

/**
 * @file
 * Contains \Drupal\interactive_outlooks\Plugin\Block\HazardsBlock.
 */

namespace Drupal\interactive_outlooks\Plugin\Block;
use Drupal\Core\Block\Blockbase;
//use Drupal\Core\Access\AccessResult;
//use Drupal\Modules\contrib\leaflet;

//namespace Drupal\interactive_outlooks\Plugin\Block;
//use Drupal\Core\Access\AccessResult;
//use Drupal\Core\Block\BlockBase;
//use Drupal\Core\Form\FormStateInterface;
//use Drupal\Core\Session\AccountInterface;

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

  /**
   * {@inheritdoc}
   */
  /*protected function blockAccess(AccountInterface $account) {
    return AccessResult::allowedIfHasPermission($account, 'access content');
  }*/

}
