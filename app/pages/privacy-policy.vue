<template>
    <div class="container mx-auto px-4 py-12">
        <h1 class="text-4xl font-bold text-primary mb-4">{{ $t('privacy_policy.title') }}</h1>
        <div class="prose max-w-none">
            <p>{{ $t('privacy_policy.last_updated') }}: July 13, 2024</p>

            <h2>{{ $t('privacy_policy.introduction.title') }}</h2>
            <p>{{ $t('privacy_policy.introduction.content') }}</p>

            <h2>{{ $t('privacy_policy.information_collection.title') }}</h2>
            <p>{{ $t('privacy_policy.information_collection.content') }}</p>

            <h2>{{ $t('privacy_policy.use_of_information.title') }}</h2>
            <p>{{ $t('privacy_policy.use_of_information.content') }}</p>
            <ul>
                <li>{{ $t('privacy_policy.use_of_information.item1') }}</li>
                <li>{{ $t('privacy_policy.use_of_information.item2') }}</li>
                <li>{{ $t('privacy_policy.use_of_information.item3') }}</li>
            </ul>

             <h2>{{ $t('privacy_policy.contact_us.title') }}</h2>
            <p>{{ $t('privacy_policy.contact_us.content') }} <a href="mailto:office@k-m-construction.com">office@k-m-construction.com</a>.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
</script> 