package com.inkubiks.eventservice

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.ui.setupWithNavController
import com.inkubiks.eventservice.databinding.ActivityMainBinding
import org.koin.androidx.viewmodel.ext.android.viewModel

class MainActivity : AppCompatActivity() {

    private var binding: ActivityMainBinding? = null
    private val viewModel: MainViewModel by viewModel()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding?.root)

        val navHostFragment =
            supportFragmentManager.findFragmentById(R.id.nav_host_fragment) as NavHostFragment
        val navController = navHostFragment.navController

        binding?.mainBottomNavigation?.apply {
            setupWithNavController(navController)
            getOrCreateBadge(R.id.chatFragment).apply {
                isVisible = true
                number = 99
            }
        }

        setupObservers()
        setupUI()

        navController.addOnDestinationChangedListener { _, destination, _ ->
            when (destination.id) {
                R.id.eventFragment -> viewModel.hideBottomNav()
                else -> viewModel.showBottomNav()
            }
        }
    }

    private fun setupUI() {}

    private fun setupObservers() =
        viewModel.bottomNavigationVisibility.observe(this) { navVisibility ->
            binding?.mainBottomNavigation?.visibility = navVisibility
        }
}