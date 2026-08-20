<?php
/**
 * Plugin Name: Pure Work Mobile Bridge
 * Description: Native-App-Erkennung, Push-Token-Registrierung, Deep Links und kleine Mobile-UX-Verbesserungen für Pure Work.
 * Version: 1.0.0
 */
if (!defined('ABSPATH')) exit;

define('PWM_VERSION', '1.0.0');
define('PWM_URL', plugin_dir_url(__FILE__));

add_action('wp_enqueue_scripts', function () {
    if (!is_user_logged_in()) return;
    wp_enqueue_script('pure-work-mobile-bridge', PWM_URL . 'assets/mobile-bridge.js', [], PWM_VERSION, true);
    wp_localize_script('pure-work-mobile-bridge', 'PW_MOBILE_BRIDGE', [
        'restUrl' => esc_url_raw(rest_url('pure-work-mobile/v1/device')),
        'nonce' => wp_create_nonce('wp_rest'),
        'homeUrl' => esc_url_raw(home_url('/')),
        'version' => PWM_VERSION,
    ]);
}, 100);

add_action('rest_api_init', function () {
    register_rest_route('pure-work-mobile/v1', '/device', [
        [
            'methods' => 'GET',
            'permission_callback' => function () { return is_user_logged_in(); },
            'callback' => function () {
                $devices = get_user_meta(get_current_user_id(), 'pw_mobile_devices', true);
                return rest_ensure_response(['ok' => true, 'devices' => is_array($devices) ? $devices : []]);
            },
        ],
        [
            'methods' => 'POST',
            'permission_callback' => function () { return is_user_logged_in(); },
            'callback' => function (WP_REST_Request $r) {
                $token = sanitize_text_field((string)$r->get_param('token'));
                $platform = sanitize_key((string)$r->get_param('platform'));
                if (!$token || strlen($token) < 20) return new WP_Error('bad_token', 'Ungültiger Device-Token.', ['status' => 400]);
                if (!in_array($platform, ['ios','android'], true)) $platform = 'unknown';
                $uid = get_current_user_id();
                $devices = get_user_meta($uid, 'pw_mobile_devices', true);
                if (!is_array($devices)) $devices = [];
                $devices = array_values(array_filter($devices, function($d) use ($token){ return !is_array($d) || ($d['token'] ?? '') !== $token; }));
                array_unshift($devices, ['token' => $token, 'platform' => $platform, 'updated_at' => current_time('mysql', true)]);
                $devices = array_slice($devices, 0, 5);
                update_user_meta($uid, 'pw_mobile_devices', $devices);
                return rest_ensure_response(['ok' => true]);
            },
        ],
        [
            'methods' => 'DELETE',
            'permission_callback' => function () { return is_user_logged_in(); },
            'callback' => function (WP_REST_Request $r) {
                $token = sanitize_text_field((string)$r->get_param('token'));
                $uid = get_current_user_id();
                $devices = get_user_meta($uid, 'pw_mobile_devices', true);
                if (!is_array($devices)) $devices = [];
                $devices = array_values(array_filter($devices, function($d) use ($token){ return !is_array($d) || ($d['token'] ?? '') !== $token; }));
                update_user_meta($uid, 'pw_mobile_devices', $devices);
                return rest_ensure_response(['ok' => true]);
            },
        ],
    ]);
});
